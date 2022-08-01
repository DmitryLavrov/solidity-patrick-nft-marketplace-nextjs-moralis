Moralis.Cloud.afterSave('ItemListed', async (request) => {
  const confirmed = request.object.get('confirmed')
  const logger = Moralis.Cloud.getLogger()

  if (confirmed) {
    logger.info('Fond item!')
    const ActiveItem = Moralis.Object.extend('ActiveItem')

    // Search and delete Updated Item
    const query = new Moralis.Query(ActiveItem)
    query.equalTo('marketplaceAddress', request.object.get('address'))
    query.equalTo('nftAddress', request.object.get('nftAddress'))
    query.equalTo('tokenId', request.object.get('tokenId'))
    query.equalTo('seller', request.object.get('seller'))
    logger.info(`Marketplace | Query: ${JSON.stringify(query, null, 2)}`)

    const updatedItem = await query.first()
    logger.info(`Marketplace | updatedItem: ${JSON.stringify(updatedItem, null, 2)}`)
    if (updatedItem) {
      // Deleting updatedItem
      await updatedItem.destroy()
      logger.info(`Deleted item:\n tokenId ${request.object.get('tokenId')} at address ${request.object.get('address')}`)
    }

    // Add new ActiveItem
    const activeItem = new ActiveItem()
    activeItem.set('marketplaceAddress', request.object.get('address'))
    activeItem.set('nftAddress', request.object.get('nftAddress'))
    activeItem.set('price', request.object.get('price'))
    activeItem.set('tokenId', request.object.get('tokenId'))
    activeItem.set('seller', request.object.get('seller'))
    logger.info(`Adding new activeItem: ${JSON.stringify(activeItem, null, 2)}`)
    logger.info('Saving...')
    await activeItem.save()
  }
})


Moralis.Cloud.afterSave('ItemCanceled', async (request) => {
  const confirmed = request.object.get('confirmed')
  const logger = Moralis.Cloud.getLogger()

  if (confirmed) {
    const ActiveItem = Moralis.Object.extend('ActiveItem')
    const query = new Moralis.Query(ActiveItem)
    query.equalTo('marketplaceAddress', request.object.get('address'))
    query.equalTo('nftAddress', request.object.get('nftAddress'))
    query.equalTo('tokenId', request.object.get('tokenId'))
    logger.info(`Marketplace | Query: ${JSON.stringify(query, null, 2)}`)

    const cancelledItem = await query.first()
    logger.info(`Marketplace | cancelledItem: ${JSON.stringify(cancelledItem, null, 2)}`)
    if (cancelledItem) {
      // Deleting cancelledItem
      await cancelledItem.destroy()
      logger.info(`Deleted item:\n tokenId ${request.object.get('tokenId')} at address ${request.object.get('address')}`)
    } else {
      logger.info(`No item fond at address ${request.object.get('address')} and tokenId ${request.object.get('tokenId')}`)
    }
  }
})


Moralis.Cloud.afterSave('ItemBought', async (request) => {
  const confirmed = request.object.get('confirmed')
  const logger = Moralis.Cloud.getLogger()

  if (confirmed) {
    const ActiveItem = Moralis.Object.extend('ActiveItem')
    const query = new Moralis.Query(ActiveItem)
    query.equalTo('marketplaceAddress', request.object.get('address'))
    query.equalTo('nftAddress', request.object.get('nftAddress'))
    query.equalTo('tokenId', request.object.get('tokenId'))
    logger.info(`Marketplace | Query: ${JSON.stringify(query, null, 2)}`)

    const boughtItem = await query.first()
    logger.info(`Marketplace | boughtItem: ${JSON.stringify(boughtItem, null, 2)}`)
    if (boughtItem) {
      // Deleting boughtItem
      await boughtItem.destroy()
      logger.info(`Deleted item:\n tokenId ${request.object.get('tokenId')} at address ${request.object.get('address')}`)
    } else {
      logger.info(`No item fond at address ${request.object.get('address')} and tokenId ${request.object.get('tokenId')}`)
    }
  }
})
