'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');

class TodoController extends Controller {
    async index() {
        const { ctx } = this;
        const result = await ctx.service.todo.index();
        console.log(result);
        if (result) {
            ctx.body = {
                status: 200,
                data: result
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '获取TODO 列表失败'
            }
        }

    }
    async get(){
        const { ctx } = this;
        console.log(ctx.params);
        const result = await ctx.service.todo.get(ctx.params.id);
        console.log(result);
        if (result) {
            ctx.body = {
                status: 200,
                data: result
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '获取任务列表失败'
            }
        }
    }
    async list() {
        const { ctx } = this;
        console.log(ctx.params);
        const result = await ctx.service.todo.list(ctx.params.page);
        console.log(result);
        if (result) {
            ctx.body = {
                status: 200,
                data: result
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '获取任务列表失败'
            }
        }
    }
    async create() {
        const { ctx } = this;
        const params = {
            ...ctx.request.body,
            createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            status: 1
        }
        const result = await ctx.service.todo.create(params);
        console.log('result' + result);
        if (result) {
            ctx.body = {
                status: 200,
                data: result
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '创建TODO失败'
            }
        }
    }
    async update() {
        const { ctx } = this;
        const result = await ctx.service.todo.update(ctx.request.body);
        console.log('result' + result);
        if (result) {
            ctx.body = {
                success: result.affectedRows === 1,
                status: 200,
                data: result
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '查询失败'
            }
        }
    }

    async updateStatus() {
        const { ctx } = this;
        const result = await ctx.service.todo.updateStatus(ctx.request.body);
        if (result) {
            ctx.body = {
                success: result.affectedRows === 1,
                status: 200,
                data: result
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '任务状态更新失败'
            }
        }
    }
}

module.exports = TodoController;