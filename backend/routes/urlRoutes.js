import express from 'express'
const router = express.Router();
import { addUrl,geturl,monitorurls,deleteUrl,getmonitorUrl } from '../controllers/urlController.js'
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js'

router.route('/addurl').post(isAuthenticated,addUrl)
router.route('/geturl').get(geturl)
router.route('/getmonitorUrl').get(getmonitorUrl)
router.route('/monitor').get(monitorurls)
router.route('/:id').get(isAuthenticated,deleteUrl)


export default router
