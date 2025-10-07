import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

export default async function fixTaxProvider({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const taxModuleService = container.resolve(Modules.TAX)

  logger.info('Fixing tax provider for regions...')

  // List all tax regions
  const taxRegions = await taxModuleService.listTaxRegions({})

  logger.info(`Found ${taxRegions.length} tax regions`)

  // Get system provider ID
  const providers = await taxModuleService.listTaxProviders({})

  if (!providers || providers.length === 0) {
    logger.error('No tax providers found!')
    return
  }

  const systemProvider = providers.find(p => p.id === 'tp_system') || providers[0]
  logger.info(`Using tax provider: ${systemProvider.id}`)

  // Update each region that doesn't have a provider
  let updated = 0
  for (const region of taxRegions) {
    if (!region.provider_id) {
      logger.info(`Updating region ${region.id} (${region.country_code})`)

      await taxModuleService.updateTaxRegions([{
        id: region.id,
        provider_id: systemProvider.id
      }])

      updated++
    }
  }

  logger.info(`Tax provider fix completed! Updated ${updated} regions.`)
}
