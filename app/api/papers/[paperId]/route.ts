import { NextRequest, NextResponse } from 'next/server';
import { fetchLatestMedicalAIPapers } from '@/app/lib/arxiv';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ paperId: string }> }
) {
  const { paperId } = await context.params;
  
  try {
    // Fetch all papers and find the one with matching ID
    // In a production app, you would ideally have a more efficient lookup
    const allPapers = await fetchLatestMedicalAIPapers(100);
    const paper = allPapers.find(p => p.id === paperId);
    
    if (!paper) {
      return new NextResponse(JSON.stringify({ error: 'Paper not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return NextResponse.json(paper);
  } catch (error) {
    console.error('Error fetching paper by ID:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch paper' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 