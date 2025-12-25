## 进制转换工具
支持**二进制**、**八进制**、**十进制**、**十六进制**之间的互相转换

***

### 高级功能
#### 参数说明
- `input`：输入的内容
- `inbase`：输入内容的进制
- `outbase`：转换为目标进制后输出
#### 页面参数示例
```text
/tool/baseconversion?input=1234&inbase=10&outbase=16
```
访问后将会将目标参数自动输入页面中
#### api调用示例
```text
/api/tool/baseconversion?input=1234&inbase=10&outbase=16
```
##### 返回内容
```json
{
  "code": 0,
  "output": "4d2"
}
```
- `code`：结果代码
  - `-1`：参数缺失
  - `0`：正常
  - `1`：输入不合法
- `output`：输出内容，可能为`null`或`undefined`