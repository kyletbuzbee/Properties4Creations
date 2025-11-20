import { generateMetadata, generateOrganizationSchema, generateWebSiteSchema } from './seo'

describe('SEO Utils', () => {
  describe('generateMetadata', () => {
    it('should generate basic metadata object', () => {
      const data = {
        title: 'Test Page',
        description: 'Test description for SEO',
        keywords: ['test', 'seo'],
      }

      const metadata = generateMetadata(data)

      expect(metadata.title).toBe('Test Page')
      expect(metadata.description).toBe('Test description for SEO')
      expect(metadata.keywords).toBe('test, seo')
    })

    it('should include Open Graph data', () => {
      const data = {
        title: 'Test Page',
        description: 'Test description',
        ogImage: '/test-image.jpg',
      }

      const metadata = generateMetadata(data)

      expect(metadata.openGraph?.title).toBe('Test Page')
      expect(metadata.openGraph?.description).toBe('Test description')
      expect(metadata.openGraph?.images?.[0]?.url).toMatch('/test-image.jpg')
    })

    it('should include Twitter Card data', () => {
      const data = {
        title: 'Test Page',
        description: 'Test description',
      }

      const metadata = generateMetadata(data)

      expect(metadata.twitter?.title).toBe('Test Page')
      expect(metadata.twitter?.description).toBe('Test description')
      expect(metadata.twitter?.card).toBe('summary_large_image')
    })
  })

  describe('generateOrganizationSchema', () => {
    it('should generate organization structured data', () => {
      const schema = generateOrganizationSchema()

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Organization')
      expect(schema.name).toBe('Properties 4 Creation')
      expect(schema.contactPoint).toBeDefined()
      expect(schema.sameAs).toBeDefined()
    })
  })

  describe('generateWebSiteSchema', () => {
    it('should generate website structured data', () => {
      const schema = generateWebSiteSchema()

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('WebSite')
      expect(schema.name).toBe('Properties 4 Creation')
      expect(schema.potentialAction).toBeDefined()
    })
  })
})
