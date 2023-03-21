class Storage {
  constructor(props) {
    this.props = props || {};
    this.source = this.props.source || window.localStorage;
    this.initInstance();
  }

  initInstance() {
    const reg = new RegExp("__expires__");
    const data = this.source;
    const list = Object.keys(data);
    if (list.length > 0) {
      list.map((key) => {
        if (!reg.test(key)) {
          const now = Date.now();
          const expires = data[`${key}__expires__`] || Date.now + 1;
          if (now >= expires) {
            this.remove(key);
          }
        }
        return key;
      });
    }
  }

  /**
   * @description 获取方法
   * @param {String} key 键
   * @returns value
   * @memberof Storage
   */
  get(key) {
    const source = this.source;
    const expired = source[`${key}__expires__`] || Date.now + 1;
    const now = Date.now();

    if (now >= expired) {
      this.remove(key);
      return;
    }
    let value = source[key];
    if (
      /^\{.*\}$/.test(value) ||
      /^\[.*\]$/.test(value) ||
      /^(true)|(false)$/.test(value)
    )
      value = JSON.parse(value);
    return value;
  }

  /**
   * @description 存储方法
   * @param {String} key 键
   * @param {String} value 值
   * @param {Number} expired 过期时间，单位分钟，非必填
   * @returns value
   * @memberof Storage
   */
  set(key, value, expired) {
    if (typeof value === typeof {}) value = JSON.stringify(value);
    const source = this.source;
    source[key] = value;
    if (expired) {
      source[`${key}__expires__`] = Date.now() + 1000 * 60 * expired;
    }
    return value;
  }

  /**
   * @description 删除方法
   * @param {String} key 键
   * @returns value
   * @memberof Storage
   */
  remove(key) {
    const data = this.source;
    const value = data[key];
    delete data[key];
    delete data[`${key}__expires__`];
    return value;
  }
}

export default {
  LS: new Storage(),
  SS: new Storage({ source: window.sessionStorage }),
};
