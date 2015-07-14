import VendorPrefix from 'react-vendor-prefix';

let global = {
  h1: {
    color: '#fff'
  }
};

function stylize(stylesObject) {
  return VendorPrefix.prefix(stylesObject);
}

export default {
  global: global,
  stylize: stylize
};
