import { defineStore } from 'pinia';
import ShoppingList from '../models/ShoppingList';

// * 购物车列表 store
export const useStore = defineStore('main', {
    state: () => ({
        list: [] as ShoppingList[],
        collect: false,
    }),
    getters: {
        getList(): ShoppingList[] {
            return this.list;
        },
        getCommodityByTitle: (state) => (title: string) =>
            state.list.find((commodity) => commodity.title === title),
        getTotalCount(): number {
            let count: number = 0;
            this.list.forEach((element) => {
                count += element.count;
            });
            return count;
        },
        getTotalPrice(): number {
            let totalPrice = 0;
            this.list.forEach((element) => {
                totalPrice += element.price * element.count;
            });
            return totalPrice;
        },
        getCollect(): boolean {
            return this.collect;
        },
    },
    actions: {
        addCommodity(title: string, price: number) {
            const count: number = 1;

            if (this.list.length === 0) {
                this.list.push({ title, price, count });
            } else {
                let flag: boolean = false;
                this.list.forEach((element) => {
                    if (element.title === title) {
                        // eslint-disable-next-line no-param-reassign
                        element.count += 1;
                        flag = !flag;
                    }
                });
                if (!flag) {
                    this.list.push({ title, price, count });
                }
            }
        },
        removeCommodity(title: string) {
            this.list.forEach((element, index) => {
                if (element.title === title) {
                    // eslint-disable-next-line no-param-reassign
                    element.count -= 1;
                }
                if (element.count === 0) {
                    this.list.splice(index, 1);
                }
            });
        },
        emptyList() {
            this.list = [];
        },
        toggleCollect() {
            this.collect = !this.collect;
        },
    },
});

export default useStore;
