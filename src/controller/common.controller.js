class CommonController {
  constructor(pageName, fieldList) {
    this.pageService = require(`../service/${pageName}.service`);
    this.fieldList = fieldList;
  }
  async createPageItem(ctx) {
    const itemInfo = ctx.request.body;
    const result = await this.pageService.createTableItem(itemInfo);
    ctx.body = {
      data: result,
      message: "创建成功"
    };
  }
  async getPageList(ctx) {
    const { offset, size } = ctx.request.body;
    const result = await this.pageService.getTableList(offset, size);
    ctx.body = result;
  }
  async searchPageList(ctx) {
    const keyWord = ctx.query.queryInfo;
    const { offset, size } = ctx.request.body; 
    const result = await this.pageService.searchTableList(this.fieldList, keyWord, offset, size);
    ctx.body = result;
  }
  async deletePageItem(ctx) {
    const { id } = ctx.params;
    const result = await this.pageService.deleteTableItem(id);
    ctx.body = {
      data: result,
      message: "删除成功"
    };
  }
  async deletePageList(ctx) {
    const { idList } = ctx.request.body;
    const result = await this.pageService.deleteTableList(idList);
    ctx.body = {
      data: result,
      message: "删除成功"
    };
  }
  async updatePageItem(ctx) {
    const { id } = ctx.params;
    const itemInfo = ctx.request.body;
    const result = await this.pageService.updateTableItem(id, itemInfo);
    ctx.body = {
      data: result,
      message: "更新成功"
    };
  }
}
module.exports = CommonController;