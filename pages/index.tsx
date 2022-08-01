import type {NextPage} from 'next'
import Header from '../components/header'
import {useMoralis, useMoralisQuery} from 'react-moralis'
import {AttributesNft} from '../models/models'
import NftBox from '../components/nftBox'

const Home: NextPage = () => {
  const {data: listedNfts, isFetching} = useMoralisQuery('ActiveItem', query => query.limit(10))

  const {isWeb3Enabled} = useMoralis()

  return (
    <>
      <Header/>

      <main className="container mx-auto">
        <h1 className="text-2xl p-4 font-bold text-slate-600">Recently listed</h1>

        {isWeb3Enabled
          ?
          isFetching
            ? <p>Loading...</p>
            : <div className="flex flex-wrap gap-4 justify-center">
              {listedNfts.map(nft => {
                const {marketplaceAddress, nftAddress, price, tokenId, seller} = nft.attributes as AttributesNft
                return <NftBox key={`${marketplaceAddress}${tokenId}`}
                               marketplaceAddress={marketplaceAddress}
                               nftAddress={nftAddress}
                               price={price}
                               tokenId={tokenId}
                               seller={seller}/>
              })}
            </div>

          : <div className='text-center mt-4'>Web3 currently not enabled</div>
        }
      </main>
    </>
  )
}

export default Home
