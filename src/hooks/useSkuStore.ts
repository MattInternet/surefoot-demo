import React from 'react';
import {skuStore} from '../stores';

const SkuStoreContext = React.createContext(skuStore);

export const useSkuStore = () => React.useContext(SkuStoreContext);