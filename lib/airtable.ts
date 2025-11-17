import Airtable from 'airtable'

// Initialize Airtable only if credentials are provided
const apiKey = process.env.AIRTABLE_API_KEY
const baseId = process.env.AIRTABLE_BASE_ID

const base = apiKey && baseId
  ? new Airtable({ apiKey }).base(baseId)
  : null

export interface Product {
  id: string
  productId?: string | number
  name: string
  description: string
  price: number
  image?: string
  images?: string[]
  category?: string
  inStock?: boolean
  includeShip?: string
  shipping?: number
}

export interface Order {
  id?: string
  customerId: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  comments?: string
  products: {
    productId: string
    productName: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  totalShipping?: number
  checkoutNumber?: number
  status?: string
  orderDate?: string
}

export interface Customer {
  id?: string
  customerId?: string
  name: string
  email: string
  phone?: string
  address?: string
}

// Get customer record ID by customer ID - tries multiple possible field names
export async function getCustomerRecordId(customerId: string): Promise<string | null> {
  if (!base) {
    console.warn('Airtable not configured')
    return null
  }

  try {
    // Try different possible field names for Customer ID
    const possibleFieldNames = ['Customer Id', 'Customer ID', 'customer id', 'ID']
    
    for (const fieldName of possibleFieldNames) {
      try {
        const records = await base(process.env.AIRTABLE_CUSTOMERS_TABLE || 'Customer Table')
          .select({
            filterByFormula: `{${fieldName}} = '${customerId}'`,
            maxRecords: 1
          })
          .firstPage()

        if (records.length > 0) {
          console.log(`Found customer record ID: ${records[0].id} using field: ${fieldName}`)
          return records[0].id
        }
      } catch (err) {
        // Field doesn't exist, try next one
        continue
      }
    }
    
    console.error(`Customer with ID ${customerId} not found in Customer Table`)
    return null
  } catch (error) {
    console.error('Error fetching customer record ID:', error)
    return null
  }
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  // Return demo products if Airtable is not configured
  if (!base) {
    console.warn('Airtable not configured. Showing demo products.')
    return getDemoProducts()
  }

  try {
    const records = await base(process.env.AIRTABLE_PRODUCTS_TABLE || 'Products')
      .select({
        view: 'Grid view',
      })
      .all()

    return records.map((record) => {
      const imageAttachments = record.get('images') as any[]
      const allImages = Array.isArray(imageAttachments) 
        ? imageAttachments.map(img => img.url).filter(Boolean)
        : []
      
      // Handle Product Type - it comes as an array from Airtable
      const productType = record.get('Product Type')
      const category = Array.isArray(productType) && productType.length > 0
        ? productType[0]
        : (typeof productType === 'string' ? productType : 'General')
      
      const rawProductId = record.get('Product Id')
      const productId = typeof rawProductId === 'string' || typeof rawProductId === 'number' 
        ? rawProductId 
        : undefined
      
      return {
        id: record.id,
        productId: productId,
        name: record.get('Product Name') as string,
        description: record.get('Product INFO') as string || '',
        price: Number(record.get('Unit Price')) || 0,
        image: allImages[0] || undefined,
        images: allImages.length > 0 ? allImages : undefined,
        category: category,
        inStock: true, // No stock field in your schema, defaulting to true
        includeShip: record.get('Include ship?') as string || undefined,
        shipping: Number(record.get('shipping')) || 0,
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return getDemoProducts()
  }
}

// Demo products for when Airtable is not configured
function getDemoProducts(): Product[] {
  return [
    {
      id: 'demo-1',
      name: 'Premium Headphones',
      description: 'High-quality wireless headphones with noise cancellation. Configure Airtable to see your actual products!',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'Electronics',
      inStock: true,
    },
    {
      id: 'demo-2',
      name: 'Smart Watch',
      description: 'Fitness tracker with heart rate monitor. This is demo data - add your Airtable credentials to show real products.',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'Electronics',
      inStock: true,
    },
    {
      id: 'demo-3',
      name: 'Designer Backpack',
      description: 'Stylish and functional backpack for everyday use. Connect your Airtable to replace this demo product.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      category: 'Accessories',
      inStock: true,
    },
    {
      id: 'demo-4',
      name: 'Wireless Keyboard',
      description: 'Mechanical keyboard with RGB lighting. Set up Airtable integration to display your products.',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      category: 'Electronics',
      inStock: true,
    },
  ]
}

// Get the next checkout number
async function getNextCheckoutNumber(): Promise<number> {
  if (!base) {
    return Date.now() // Fallback for demo mode
  }

  try {
    const records = await base(process.env.AIRTABLE_ORDERS_TABLE || 'Order Table')
      .select({
        maxRecords: 1,
        sort: [{ field: 'Checkout Number', direction: 'desc' }],
        fields: ['Checkout Number']
      })
      .firstPage()

    if (records.length > 0) {
      const lastCheckoutNumber = records[0].get('Checkout Number') as number
      return (lastCheckoutNumber || 0) + 1
    }
    
    return 1 // First checkout number
  } catch (error) {
    console.error('Error getting next checkout number:', error)
    return 1
  }
}

// Create orders (one record per product in cart with same checkout number)
export async function createOrders(orders: Order[], checkoutNumber?: number): Promise<{ success: boolean; checkoutNumber?: number; orderIds?: string[] }> {
  if (!base) {
    console.warn('Airtable not configured. Orders not saved:', orders)
    return { success: true, checkoutNumber: Date.now(), orderIds: orders.map((_, i) => `demo-order-${i}`) }
  }

  try {
    // Get checkout number if not provided
    const finalCheckoutNumber = checkoutNumber || await getNextCheckoutNumber()
    
    // Create one order record per product in the cart
    const recordsToCreate: any[] = []
    
    for (const order of orders) {
      // Look up customer's Airtable record ID
      const customerRecordId = await getCustomerRecordId(order.customerId)
      
      if (!customerRecordId) {
        console.error(`Customer with ID ${order.customerId} not found in Customer Table. Skipping order.`)
        continue
      }
      
      // Create a separate record for each product
      for (const product of order.products) {
        recordsToCreate.push({
          fields: {
            'Customer Idd': [customerRecordId], // Linked record
            'Product Id': [product.productId], // Linked record
            'Order Quantity': product.quantity, // Quantity from cart
            'Checkout Number': finalCheckoutNumber, // Auto-incremented number
            'comments': order.comments || '',
          },
        })
      }
    }

    if (recordsToCreate.length === 0) {
      console.error('No records to create')
      return { success: false }
    }

    console.log('Creating orders with records:', JSON.stringify(recordsToCreate, null, 2))
    
    const createdRecords = await base(process.env.AIRTABLE_ORDERS_TABLE || 'Order Table').create(recordsToCreate)

    // Create summary record in Checkout Table
    try {
      const firstOrder = orders[0]
      const customerId = firstOrder.customerId
      
      // Look up customer record ID for linked field
      const customerRecordId = await getCustomerRecordId(customerId)
      
      const totalAmount = orders.reduce((sum, order) => {
        return sum + order.products.reduce((orderSum, product) => {
          return orderSum + (product.price * product.quantity)
        }, 0)
      }, 0)
      
      const productNames = orders.reduce((names: string[], order) => {
        order.products.forEach(product => {
          names.push(product.productName)
        })
        return names
      }, [])
      
      // Calculate total shipping from orders
      const totalShipping = orders.reduce((sum, order) => sum + (order.totalShipping || 0), 0)
      
      await base(process.env.AIRTABLE_CHECKOUT_TABLE || 'Checkout Table').create([{
        fields: {
          'Checkout Number': finalCheckoutNumber,
          'Customer Id': customerRecordId ? [customerRecordId] : undefined, // Linked record as array
          'Total Amount': totalAmount,
          'Total Shipping': totalShipping,
          'Products': productNames.join(', '),
        }
      }])
      
      console.log(`Created checkout summary: #${finalCheckoutNumber}, Customer: ${customerId}, Total: ${totalAmount}, Shipping: ${totalShipping}, Products: ${productNames.join(', ')}`)
    } catch (checkoutError) {
      console.error('Error creating checkout summary:', checkoutError)
      console.error('Checkout error details:', JSON.stringify(checkoutError, null, 2))
      // Continue even if checkout summary fails
    }

    return {
      success: true,
      checkoutNumber: finalCheckoutNumber,
      orderIds: createdRecords.map(r => r.id)
    }
  } catch (error) {
    console.error('Error creating orders:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return { success: false }
  }
}

// Create an order (single item) - kept for backward compatibility
export async function createOrder(order: Order): Promise<string | null> {
  const result = await createOrders([order], order.checkoutNumber)
  return result.success && result.orderIds ? result.orderIds[0] : null
}

// Get a single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  if (!base) {
    console.warn('Airtable not configured')
    return null
  }
  
  try {
    const record = await base(process.env.AIRTABLE_PRODUCTS_TABLE || 'Products').find(id)
    
    const imageAttachments = record.get('images') as any[]
    const allImages = Array.isArray(imageAttachments) 
      ? imageAttachments.map(img => img.url).filter(Boolean)
      : []
    
    // Handle Product Type - it comes as an array from Airtable
    const productType = record.get('Product Type')
    const category = Array.isArray(productType) && productType.length > 0
      ? productType[0]
      : (typeof productType === 'string' ? productType : 'General')
    
    const rawProductId = record.get('Product Id')
    const productId = typeof rawProductId === 'string' || typeof rawProductId === 'number' 
      ? rawProductId 
      : undefined
    
    return {
      id: record.id,
      productId: productId,
      name: record.get('Product Name') as string,
      description: record.get('Product INFO') as string || '',
      price: Number(record.get('Unit Price')) || 0,
      image: allImages[0] || undefined,
      images: allImages.length > 0 ? allImages : undefined,
      category: category,
      inStock: true, // No stock field in your schema, defaulting to true
      includeShip: record.get('Include ship?') as string || undefined,
      shipping: Number(record.get('shipping')) || 0,
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default base

