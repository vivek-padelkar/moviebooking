import { getEncryptedDate, getDecryptedDate } from '../utils/enc.js'
export const getEncdata = (req, res) => {
  const { type, data } = req.body
  if (type === 'enc') {
    res.json({
      data: getEncryptedDate(JSON.stringify(data)),
    })
  } else {
    res.json({
      data: JSON.parse(getDecryptedDate(data)),
    })
  }
}
