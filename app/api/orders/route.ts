import { NextResponse } from 'next/server'
import { createOrders } from '@/lib/airtable'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { customerId, comments, products, totalAmount, totalShipping } = body

    // Validate required fields
    if (!customerId || !products || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields. Customer ID, products, and total amount are required.' },
        { status: 400 }
      )
    }

    // Create a single order with all products
    const result = await createOrders([{
      customerId,
      comments,
      products,
      totalAmount,
      totalShipping: totalShipping || 0,
    }])

    if (!result.success) {
      console.error('Order creation failed')
      return NextResponse.json(
        { error: 'Failed to create order. Please check server logs for details.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        orderIds: result.orderIds,
        checkoutNumber: result.checkoutNumber
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error processing order:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

