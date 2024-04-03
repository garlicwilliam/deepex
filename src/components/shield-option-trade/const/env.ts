import { NET_BNB, Network } from '../../../constant/network';
import { ShieldUnderlyingType, TokenErc20 } from '../../../state-manager/state-types';
import { ShieldOptionTradeContracts, ShieldUnderlyingContracts } from './shield-option-address';
import deepLight from '../../../assets/imgs/logo/deepex/deepex-light.svg';
import deepDark from '../../../assets/imgs/logo/deepex/deepex-dark.svg';
import deepMobile from '../../../assets/imgs/logo/deepex/deepex.svg';

enum OracleType {
  ChainLink,
}

type ImgConf = {
  url: string;
  size: {
    w: number;
    h: number;
  };
};
export type OracleConf = {
  type: OracleType;
  address: string;
};
type EnvNetConfig = {
  CurNetwork: Network;
  DefaultToken: TokenErc20;
  SubGraphUrl: string;
  SubGraphOracleUrl: string;
  Addresses: {
    trade: ShieldOptionTradeContracts;
    underlying: ShieldUnderlyingContracts;
  };
  Oracles: { [k in ShieldUnderlyingType]?: OracleConf };
  ClosePriceNeedFix: boolean;
};
type EnvConfig = {
  Supports: { [n in Network]?: EnvNetConfig };
  TokenIcon: string;
  Logo: {
    Web: ImgConf;
    WebDark: ImgConf;
    Mobile: ImgConf;
  };
  Brand: {
    Domain: string;
    Project: string;
  };
  FixDigits: {
    Open: { [u in ShieldUnderlyingType]: number };
  };
};

enum Env {
  DeepEx,
}

const env2: { [k in Env]: EnvConfig } = {
  [Env.DeepEx]: {
    Supports: {
      [NET_BNB]: {
        CurNetwork: NET_BNB,
        DefaultToken: {
          symbol: 'POT',
          address: '0x5150404c61706b6874cF43DC34c9CA88DaA5F9e3',
          decimal: 18,
          network: NET_BNB,
        },
        SubGraphUrl: 'https://api.thegraph.com/subgraphs/name/garlicwilliam/deepex-history-bsc',
        SubGraphOracleUrl: 'https://api.thegraph.com/subgraphs/name/garlicwilliam/chainlink-price-bsc',
        Addresses: {
          trade: {
            optionTrade: '0xa5a6b19adc9e92c1be1720b0e2e2ec03ac16845d',
            liquidityManager: '0x755773f8e288ec4b4c5e9b823f29ebdf84cfa7e2',
            liquidityFactory: '0x689e95a1d62a2f616c1f540f7463ad4942c4a29d',
            broker: '0xd3b7e0117487682c6a099cbbb4910c6e209f7061',
          },
          underlying: {
            ETH: '0xfe99d4b8941e53a05759a9e545b7d21c58fba66a',
            BTC: '0xa8862d494a32b2def6276bbd00372ff50a7894a8',
          },
        },
        Oracles: {
          ETH: {
            type: OracleType.ChainLink,
            address: '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e',
          },
          BTC: {
            type: OracleType.ChainLink,
            address: '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf',
          },
        },
        ClosePriceNeedFix: true,
      },
    },
    TokenIcon: 'https://static.fufuture.io/token-icon.json',
    Logo: {
      Web: { url: deepLight, size: { w: 100, h: 30 } },
      WebDark: { url: deepDark, size: { w: 100, h: 30 } },
      Mobile: { url: deepMobile, size: { w: 100, h: 100 } },
    },
    Brand: {
      Domain: 'deepex.io',
      Project: 'DeepEx',
    },
    FixDigits: {
      Open: {
        BTC: 3,
        ETH: 3,
      },
    },
  },
};

export const SLD_ENV_CONF = env2[Env.DeepEx];
