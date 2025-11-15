# Airtable E-Commerce Store

A beautiful, modern e-commerce website that integrates with Airtable for product management, order tracking, and customer profiles.

## Features

- 🛍️ **Product Catalog** - Display products from Airtable with images, descriptions, and pricing
- 🛒 **Shopping Cart** - Add products to cart with quantity management
- 📦 **Order Management** - Orders are automatically saved to Airtable
- 👤 **Customer Profiles** - Integrated Tally form for customer registration that syncs with Airtable
- 💳 **Checkout Flow** - Simple and intuitive checkout process
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Fast Performance** - Built with Next.js 14 and optimized for speed

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Airtable
- **Forms**: Tally (for customer profiles)
- **Icons**: Lucide React

## Prerequisites

Before you begin, make sure you have:

1. Node.js 18+ installed
2. An Airtable account with a base created
3. A Tally account (for customer profile forms)

## Airtable Setup

### 1. Create Your Airtable Base

Create a new base in Airtable with the following tables:

#### Products Table
- **Name** (Single line text) - Product name
- **Description** (Long text) - Product description
- **Price** (Number) - Product price
- **Image** (Attachment) - Product image(s)
- **Category** (Single line text) - Product category
- **In Stock** (Checkbox) - Whether product is in stock

#### Orders Table
- **Customer Name** (Single line text)
- **Customer Email** (Email)
- **Customer Phone** (Phone number)
- **Products** (Long text) - JSON string of ordered products
- **Total Amount** (Number)
- **Status** (Single select: Pending, Processing, Completed, Cancelled)
- **Order Date** (Date)

#### Customers Table
- **Name** (Single line text)
- **Email** (Email)
- **Phone** (Phone number)
- **Address** (Long text)
- **Created Date** (Date)

### 2. Get Your Airtable Credentials

1. Go to [Airtable Account](https://airtable.com/account)
2. Generate a personal access token or use your API key
3. Find your Base ID from the API documentation (airtable.com/api)

## Tally Form Setup

### 1. Create Customer Profile Form

1. Go to [Tally.so](https://tally.so) and create a new form
2. Add fields that match your Airtable Customers table:
   - Name
   - Email
   - Phone
   - Address

### 2. Connect to Airtable

1. In Tally, go to your form settings
2. Navigate to Integrations → Airtable
3. Connect your Airtable account
4. Map the form fields to your Customers table columns

### 3. Get Embed URL

1. Click "Share" on your Tally form
2. Select "Embed"
3. Copy the embed URL (it will look like: `https://tally.so/embed/xxxxx`)

## Installation

1. **Clone or navigate to the project directory**

```bash
cd airtable-ecommerce
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here

# Table Names (adjust if your table names are different)
AIRTABLE_PRODUCTS_TABLE=Products
AIRTABLE_ORDERS_TABLE=Orders
AIRTABLE_CUSTOMERS_TABLE=Customers

# Tally Form
NEXT_PUBLIC_TALLY_FORM_URL=https://tally.so/embed/your_form_id
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
airtable-ecommerce/
├── app/
│   ├── api/
│   │   ├── orders/          # Order creation API
│   │   └── products/        # Products API
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout page
│   ├── profile/             # Customer profile page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── Header.tsx           # Site header with cart
│   ├── Hero.tsx             # Hero section
│   ├── ProductCard.tsx      # Individual product card
│   └── ProductGrid.tsx      # Products grid display
├── context/
│   └── CartContext.tsx      # Shopping cart state management
├── lib/
│   └── airtable.ts          # Airtable integration
└── package.json
```

## Usage

### For Customers

1. **Browse Products**: View all available products on the home page
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in the header
4. **Checkout**: Fill in your contact information and place order
5. **Create Profile**: Visit the Profile page to save your information

### For Store Owners

1. **Manage Products**: Add, edit, or remove products in your Airtable Products table
2. **Track Orders**: View all orders in your Airtable Orders table
3. **View Customers**: See customer profiles in your Customers table
4. **Update Inventory**: Toggle the "In Stock" checkbox for products

## Customization

### Styling

- Edit `tailwind.config.ts` to change the color scheme
- Modify `app/globals.css` for global styles
- Update individual components for specific styling changes

### Branding

1. Replace "YourShop" in `components/Header.tsx` with your store name
2. Update `app/layout.tsx` metadata (title, description)
3. Customize the hero section in `components/Hero.tsx`

### Airtable Fields

If your Airtable table structure is different, update the field mappings in `lib/airtable.ts`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy!

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Troubleshooting

### Products not showing?

- Verify your Airtable API key and Base ID are correct
- Check that your Products table has the correct field names
- Ensure at least one product exists in the table

### Orders not saving?

- Confirm the Orders table exists with all required fields
- Check the browser console and server logs for errors
- Verify the Airtable API key has write permissions

### Tally form not displaying?

- Ensure the Tally form URL is correctly set in `.env.local`
- Verify the URL starts with `https://tally.so/embed/`
- Check that the form is published in Tally

## Support

For issues or questions:
1. Check the Airtable API documentation
2. Review Tally integration guides
3. Check the Next.js documentation

## License

MIT License - feel free to use this project for your own store!

