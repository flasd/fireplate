import Loadable from 'react-loadable';

const defaults = {
    delay: 225,
    timeout: 10000,
};

export default function Load(options) {
    return Loadable(Object.assign({}, defaults, options));
}
