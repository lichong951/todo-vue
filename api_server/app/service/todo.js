const Service = require('egg').Service;

class TodoService extends Service {
    async index() {
        const { app } = this;
        try {
            const result = await app.mysql.select('todo');
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async list(page) {
        const { app } = this;
        console.log('page='+page);
        const count = 5;
        const offsetValue = (page - 1) * count;
        try {
            const result = await app.mysql.select('todo', {
                limit: count, // 返回数据量
                offset: offsetValue // 数据偏移量
            });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(params) {
        console.log('params:' + params);
        const { app } = this;
        try {
            const result = await app.mysql.insert('todo', params);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(params) {
        console.log(params);
        const { app } = this;
        const options = {
            where: {
                id: params.id
            }
        };
        try {
            const result = await app.mysql.update('todo', params, options);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateStatus(params) {
        console.log(params);
        const { app } = this;
        const options = {
            where: {
                id: params.id
            }
        };
        try {
            const result = await app.mysql.update('todo', params, options);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = TodoService;
