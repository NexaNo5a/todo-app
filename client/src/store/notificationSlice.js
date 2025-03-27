// store/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        list: [] // 通知列表
    },
    reducers: {
        addNotification: (state, action) => {
            const id = Date.now() // 每个通知一个唯一 ID
            state.list.push({ id, ...action.payload })
        },
        removeNotification: (state, action) => {
            state.list = state.list.filter(n => n.id !== action.payload)
        }
    }
})

export const {addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer