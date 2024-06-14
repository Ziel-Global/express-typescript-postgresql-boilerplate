import { Languages } from '../../types.js';
import { logFailure } from '../../utils/helpers.js';
import en, { MsgType } from './en';

const findKey = (ref: MsgType, key: string) => {
    const msg = ref.find(eachMsg => eachMsg.id === key)?.msg;
        if (!msg) {
            return logFailure('Unknown Key Provided!')
        }
        return msg;
}

export default (key: string, lang?: Languages) => {
  switch (lang) {
    default:
        return findKey(en, key)
  }
};
