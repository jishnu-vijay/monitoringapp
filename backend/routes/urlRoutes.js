import express from 'express'
const router = express.Router();
import { addUrl,geturl } from '../controllers/urlController.js'
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js'

router.route('/addurl').get(isAuthenticated,addUrl)
router.route('/geturl').get(isAuthenticated,geturl)


export default router
