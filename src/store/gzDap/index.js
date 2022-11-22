export default {
    namespaced: true,
    state: {
        count: 59,//定时更新时间
        min: 4,
    },
    mutations: {
        changeCount(state) {
            if (state.count == 0) {
                state.count = 59
                if (state.min == 0) {
                    state.min = 5
                }
                state.min--
            } else {
                state.count--
            }
        },
        hdCount(state) {
            state.count = 59
            state.min = 4
        }
    }
}