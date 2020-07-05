const Service =require('egg').Service;

class TodoService extends Service{
    async index(){
        const{app}=this;
        try {
            const result=await app.mysql.select('todo');
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async create(params){
        console.log('params:'+params);
        const{app}=this;
        try {
            const result =await app.mysql.insert('todo',params);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(params){
        console.log(params);
        const{app} =this;
        const options = {
            where: {
              id: params.id
            }
          };
        try {
            const result =await app.mysql.update('todo',params,options);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateStatus(params){
        console.log(params);
        const{app} =this;
        const options = {
            where: {
              id: params.id
            }
          };
          try {
            const result =await app.mysql.update('todo',params,options);
              return result;
          } catch (error) {
            console.log(error);
            return null;
          }
    }
}

module.exports = TodoService;
