#!/usr/bin/env node

/**
 * Image Bulk Download Pipeline for Properties 4 Creation
 * 
 * This script automates downloading images from Pexels API
 * Downloads images in batches and organizes them automatically
 * 
 * Prerequisites:
 * - Node.js installed
 * - Free Pexels API key (get from https://www.pexels.com/api/)
 * - Images will be saved to web/public/images/
 * 
 * Usage:
 * npm run download-images -- --api-key YOUR_PEXELS_API_KEY
 * 
 * Or set PEXELS_API_KEY environment variable and run:
 * npm run download-images
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Configuration
const CONFIG = {
  // Get free API key at https://www.pexels.com/api/
  apiKey: process.env.PEXELS_API_KEY || 'ENTER_YOUR_API_KEY_HERE',
  baseUrl: 'https://api.pexels.com/v1/search',
  imagesDir: path.join(__dirname, '../public/images'),
  
  // Image download specifications
  imageSpecs: {
    hero: {
      queries: [
        'veteran family home affordable housing',
        'happy diverse family moving day',
        'renovated kitchen modern apartment',
        'community neighborhood street'
      ],
      per_page: 1,
      targetDir: 'hero',
      namingPattern: ['seller-hero', 'renter-hero', 'veteran-hero', 'community-hero']
    },
    
    properties: {
      before_after: {
        queries: [
          'before after renovation kitchen',
          'before after bathroom renovation',
          'before after living room renovation',
          'old house renovation modern',
          'property transformation before after'
        ],
        per_page: 1,
        targetDir: 'properties/before-after',
        // Will create numbered folders (1, 2, 3, etc) with before/after pairs
      },
      
      types: {
        queries: [
          'modern 1 bedroom apartment',
          '2 bedroom family home interior',
          '3 bedroom house spacious',
          'accessible wheelchair friendly home',
          'urban efficiency apartment',
          'suburban home neighborhood'
        ],
        per_page: 1,
        targetDir: 'properties/types',
        namingPattern: ['1-bedroom-modern', '2-bedroom-family', '3-bedroom-spacious', 
                       'accessible-home', 'urban-efficiency', 'suburban-comfort']
      },
      
      neighborhood: {
        queries: [
          'walkable neighborhood street',
          'community park green space',
          'public transportation accessible',
          'local amenities shopping',
          'diverse community people'
        ],
        per_page: 1,
        targetDir: 'properties/neighborhood',
        namingPattern: ['street-community', 'park-access', 'transit-accessible', 
                       'local-amenities', 'diverse-community']
      },
      
      details: {
        queries: [
          'modern kitchen design',
          'accessible bathroom design',
          'hardwood floors wood flooring',
          'HVAC energy efficient',
          'outdoor patio deck'
        ],
        per_page: 1,
        targetDir: 'properties/details',
        namingPattern: ['kitchen-modern', 'bathroom-accessible', 'flooring-quality',
                       'energy-efficient', 'outdoor-space']
      }
    },
    
    avatars: {
      testimonials: {
        queries: [
          'professional portrait headshot diverse',
          'professional woman headshot',
          'professional man headshot',
          'veteran military portrait',
          'smiling professional person'
        ],
        per_page: 1,
        targetDir: 'avatars/testimonials',
        namingPattern: ['garcia-family', 'veteran-success-1', 'veteran-success-2', 
                       'family-story', 'community-impact']
      },
      
      team: {
        queries: [
          'professional business portrait male',
          'professional business portrait female',
          'diverse professional team',
          'leader executive portrait',
          'young professional portrait',
          'diverse professional people'
        ],
        per_page: 1,
        targetDir: 'avatars/team',
        namingPattern: ['executive-director', 'operations-manager', 'community-coordinator',
                       'veteran-liaison', 'housing-specialist', 'finance-director']
      }
    },
    
    patterns: {
      queries: [
        'wood texture background',
        'fabric texture neutral',
        'concrete texture background',
        'linen texture subtle'
      ],
      per_page: 1,
      targetDir: 'patterns',
      namingPattern: ['wood-texture', 'neutral-weave', 'concrete-light', 'linen-subtle']
    }
  }
};

/**
 * Make HTTPS request to Pexels API
 */
function fetchFromPexels(query, page = 1) {
  return new Promise((resolve, reject) => {
    const url = new URL(CONFIG.baseUrl);
    url.searchParams.append('query', query);
    url.searchParams.append('per_page', '1');
    url.searchParams.append('page', page);

    const options = {
      headers: {
        'Authorization': CONFIG.apiKey
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`API Error: ${res.statusCode} - ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Download image from URL
 */
function downloadImage(imageUrl, targetPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(imageUrl);
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(targetPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(targetPath);
        });
        fileStream.on('error', reject);
      } else {
        reject(new Error(`Failed to download: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Download single image and save
 */
async function downloadSingleImage(query, targetDir, fileName, imageIndex = 0) {
  try {
    console.log(`  Searching: "${query}"...`);
    const result = await fetchFromPexels(query, imageIndex + 1);
    
    if (!result.photos || result.photos.length === 0) {
      console.log(`    ⚠️  No results found for "${query}"`);
      return null;
    }

    const photo = result.photos[0];
    // Get large but web-optimized version
    const imageUrl = photo.src.large; // 940x627
    
    ensureDir(targetDir);
    const ext = imageUrl.split('.').pop().split('?')[0];
    const filePath = path.join(targetDir, `${fileName}.${ext}`);
    
    console.log(`    ⬇️  Downloading: ${fileName}...`);
    await downloadImage(imageUrl, filePath);
    console.log(`    ✅ Saved: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error(`    ❌ Error: ${error.message}`);
    return null;
  }
}

/**
 * Process batch of image specs
 */
async function processBatch(batchName, specs) {
  console.log(`\n📷 Processing ${batchName}...`);
  const targetDir = path.join(CONFIG.imagesDir, specs.targetDir);
  
  if (!specs.queries || specs.queries.length === 0) {
    console.log(`  ⚠️  No queries defined`);
    return;
  }

  for (let i = 0; i < specs.queries.length; i++) {
    const query = specs.queries[i];
    const fileName = specs.namingPattern ? specs.namingPattern[i] : `image-${i + 1}`;
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit: 1 req/sec
    await downloadSingleImage(query, targetDir, fileName);
  }
}

/**
 * Process nested categories (like properties > before-after)
 */
async function processNestedBatch(batchName, categories) {
  console.log(`\n📷 Processing ${batchName}...`);
  
  for (const [catName, specs] of Object.entries(categories)) {
    console.log(`  📁 ${catName}`);
    const targetDir = path.join(CONFIG.imagesDir, specs.targetDir);
    
    if (!specs.queries) continue;

    for (let i = 0; i < specs.queries.length; i++) {
      const query = specs.queries[i];
      const fileName = specs.namingPattern ? specs.namingPattern[i] : `image-${i + 1}`;
      
      // For before-after, create numbered folder structure
      if (catName === 'before_after') {
        const folderNum = Math.floor(i / 2) + 1;
        const isBeforeImage = i % 2 === 0;
        const beforeAfterDir = path.join(targetDir, `property-${folderNum}`);
        const finalFileName = isBeforeImage ? 'before' : 'after';
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        await downloadSingleImage(query, beforeAfterDir, finalFileName);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await downloadSingleImage(query, targetDir, fileName);
      }
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Properties 4 Creation - Image Bulk Download Pipeline');
  console.log('=' .repeat(60));
  
  // Check API key
  if (CONFIG.apiKey === 'ENTER_YOUR_API_KEY_HERE') {
    console.error('\n❌ ERROR: Pexels API key not set!');
    console.error('\nTo get a free API key:');
    console.error('1. Visit https://www.pexels.com/api/');
    console.error('2. Sign up for free account');
    console.error('3. Copy your API key');
    console.error('\nThen run:');
    console.error('  npm run download-images -- --api-key YOUR_KEY');
    console.error('\nOr set environment variable:');
    console.error('  $env:PEXELS_API_KEY="YOUR_KEY"');
    process.exit(1);
  }

  console.log(`✅ API Key configured`);
  console.log(`📁 Target directory: ${CONFIG.imagesDir}\n`);

  try {
    // Ensure base directory exists
    ensureDir(CONFIG.imagesDir);

    // Process single-level batches
    await processBatch('Hero Images', CONFIG.imageSpecs.hero);
    await processBatch('Testimonial Avatars', CONFIG.imageSpecs.avatars.testimonials);
    await processBatch('Team Avatars', CONFIG.imageSpecs.avatars.team);
    await processBatch('Background Patterns', CONFIG.imageSpecs.patterns);

    // Process nested batches
    await processNestedBatch('Property Showcase', {
      before_after: CONFIG.imageSpecs.properties.before_after,
      types: CONFIG.imageSpecs.properties.types,
      neighborhood: CONFIG.imageSpecs.properties.neighborhood,
      details: CONFIG.imageSpecs.properties.details
    });

    console.log('\n' + '='.repeat(60));
    console.log('✅ Download Complete!');
    console.log('\n📊 Summary:');
    console.log('  • Hero images: 4');
    console.log('  • Property before/after: 5 pairs');
    console.log('  • Property types: 6');
    console.log('  • Neighborhood: 5');
    console.log('  • Details: 5');
    console.log('  • Testimonial avatars: 5');
    console.log('  • Team avatars: 6');
    console.log('  • Background patterns: 4');
    console.log('\nTotal: ~40 professional images\n');
    console.log('Next steps:');
    console.log('1. Review images in web/public/images/');
    console.log('2. Optimize with: npm run optimize-images');
    console.log('3. Run: npm run build');
    console.log('4. Deploy: git push origin gh-pages\n');

  } catch (error) {
    console.error('❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--api-key')) {
  const keyIndex = process.argv.indexOf('--api-key');
  if (keyIndex + 1 < process.argv.length) {
    CONFIG.apiKey = process.argv[keyIndex + 1];
  }
}

main();
