import CryptoJS from 'crypto-js'

const getEncryptedDate = (data) => {
  return CryptoJS.AES.encrypt(data, process.env.ENCSECRET).toString()
}

const getDecryptedDate = (data) => {
  let decrptedData = CryptoJS.AES.decrypt(data, process.env.ENCSECRET)
  return decrptedData.toString(CryptoJS.enc.Utf8)
}

export { getEncryptedDate, getDecryptedDate }
