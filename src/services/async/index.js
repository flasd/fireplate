import Loadable from 'react-loadable';

const defaults = {
    delay: 225,
    timeout: 10000,
};

export default function Load(path, userOpt) {
    const options = Object.assign(defaults, userOpt, {
        loader: import (path),
    });

    return Loadable(options);
}
