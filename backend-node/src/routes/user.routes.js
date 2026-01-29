import express from 'express'
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

// All routes require authentication
router.use(protect)

router.route('/')
    .get(authorize('admin'), getUsers)

router.route('/:id')
    .get(authorize('admin'), getUser)
    .put(updateUser)
    .delete(authorize('admin'), deleteUser)

export default router
