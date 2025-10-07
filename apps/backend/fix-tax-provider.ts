import { MedusaApp } from '@medusajs/framework/http'

async function fixTaxProvider() {
  const { container } = await MedusaApp()
  const query = container.resolve('query')
  
  // Get all tax regions
  const { data: taxRegions } = await query.graph({
    entity: 'tax_region',
    fields: ['id', 'provider_id', 'country_code'],
  })
  
  console.log('Found tax regions:', taxRegions.length)
  
  // Update regions without a provider
  const remoteLink = container.resolve('remoteLink')
  
  for (const region of taxRegions) {
    if (!region.provider_id) {
      console.log(\`Updating region \${region.id} (\${region.country_code}) to use system provider\`)
      
      await remoteLink.query({
        tax_region: {
          __args: {
            filters: { id: region.id }
          },
          fields: ['id'],
          tax_provider: {
            __args: {
              filters: { is_enabled: true }
            }
          }
        }
      })
    }
  }
  
  console.log('Tax provider fix completed')
  process.exit(0)
}

fixTaxProvider().catch(console.error)
