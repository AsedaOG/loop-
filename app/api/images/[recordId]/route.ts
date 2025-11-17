import { NextResponse } from 'next/server'
import base from '@/lib/airtable'

export async function GET(
  request: Request,
  { params }: { params: { recordId: string } }
) {
  try {
    if (!base) {
      return NextResponse.json(
        { error: 'Airtable not configured' },
        { status: 500 }
      )
    }

    const recordId = params.recordId

    // Fetch the product record from Airtable
    const record = await base(process.env.AIRTABLE_PRODUCTS_TABLE || 'Product').find(recordId)
    
    // Get images from the record
    const imageAttachments = record.get('images') as any[]
    const images = Array.isArray(imageAttachments) 
      ? imageAttachments.map(img => img.url).filter(Boolean)
      : []

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'No images found' },
        { status: 404 }
      )
    }

    // Return all image URLs
    return NextResponse.json({
      images,
      primaryImage: images[0],
      totalImages: images.length
    })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

