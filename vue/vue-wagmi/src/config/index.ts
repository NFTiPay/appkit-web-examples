import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { polygonAmoy, type AppKitNetwork } from '@reown/appkit/networks'
import { walletConnect, injected, metaMask, coinbaseWallet } from 'wagmi/connectors'

export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [polygonAmoy]

// Define Reown metadata
export const metadata = {
  name: 'Test App',
  description: 'This is a test app',
  url: 'http://localhost:5173',
  icons: ['https://placehold.co/500x500?text=TEST']
}

// Set up connectors
const connectors = []
// Uncomment walletconnect to see the double initialization warning
// When commented, no warning. But, every refresh will require you to click connect wallet again if using wallet connect
connectors.push(walletConnect({ projectId, metadata, showQrModal: false }))
// Uncomment metamask to see the occasional metamask showing up twice error, one without the icon
connectors.push(metaMask({
  dappMetadata: {
    name: metadata.name,
    url: metadata.url,
    iconUrl: metadata.icons[0]
  }
})) 
connectors.push(injected({ shimDisconnect: true }))
connectors.push(
  coinbaseWallet({
    appName: metadata.name,
    appLogoUrl: metadata.icons[0]
  })
)

export const wagmiAdapter = new WagmiAdapter({
  // connectors,
  networks,
  projectId
})