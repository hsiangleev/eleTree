### 事件

| 方法名      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| checkbox | checkbox选择 | (type, data)1.事件名，2.当前节点数据 |
| click | 节点点击 | (type, data)1.事件名，2.当前节点数据 |
| copy | 节点复制 | (type, data, load, stop)1.事件名，2.当前节点数据, 3. 执行该操作, 4. 取消执行该操作 |
| paste | 粘贴到子节点 | 与copy一致 |
| paste_before | 粘贴到节点之前 | 与copy一致 |
| paste_after |  粘贴到节点之后 | 与copy一致 |
| cut_paste | 剪贴节点 | 与copy一致 |
| edit | 编辑节点 | 与copy一致 |
| remove | 删除节点 | 与copy一致 |
| add_child | 添加子节点 | 与copy一致 |
| add_before |  添加到节点前 | 与copy一致 |
| add_after | 添加到节点后 | 与copy一致 |
| custom_ | 自定义事件 | 与copy一致 |