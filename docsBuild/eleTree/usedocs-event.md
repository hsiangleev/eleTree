### 事件

| 方法名      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| checkbox | checkbox选择 | (type, data)1.事件名，2.当前节点数据 |
| radio | radio选择 | (type, data)1.事件名，2.当前节点数据 |
| click | 节点点击 | (type, data)1.事件名，2.当前节点数据 |
| copy | 节点复制 | (type, data, load, stop, rightClickData)1.事件名，2.当前节点数据, 3. 执行该操作, 4. 取消执行该操作, 5. 上次右键菜单时，对应的节点数据 |
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
| drag | 拖拽事件 | (type, data, load, stop, endData, range)1.事件名，2.初始移动的节点数据, 3. 执行该操作, 4. 取消执行该操作, 5. 移动到某节点的数据, 6. 移动到节点范围(outer:移动到根节点/inner:移动到子节点) |