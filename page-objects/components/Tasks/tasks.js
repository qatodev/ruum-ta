import { t } from 'testcafe'
import TasksPage from '../../pages/TasksPage'

const tasksPage = new TasksPage()

class Tasks {

    async timeStamp() {
        return Date().toString().substr(4, 20)
    }

    async createNewDummyTask(newTaskName, newTaskRuum, newTaskSection) {
        await t
            .click(tasksPage.newTask)
            .typeText(tasksPage.newTaskName, newTaskName, {paste: true, replace: true })
            .typeText(tasksPage.newTaskRuum, newTaskRuum, {paste: true, replace: true })
            .pressKey('enter')
            .typeText(tasksPage.newTaskSection, newTaskSection, {paste: true, replace: true })
            .pressKey('enter')
            .click(tasksPage.createTaskButton)
    }

    async matchCurrentStatusCssClass(i,x) {
        const iconClass = await tasksPage.table.find('cdk-row').nth(i).find('.icon').getAttribute('class')
        const iconParentClass = await tasksPage.table.find('cdk-row').nth(i).find('.icon').parent().getAttribute('class')
        if (iconClass.includes(x.iconClass)
            && iconParentClass.includes(x.iconParentClass)) {
            //console.log(iconClass + ' includes '+x.iconClass)
            //console.log(iconParentClass + ' includes '+x.iconParentClass)
            return true
        }
        return false
    }

    async currentStatus(i) {
        const taskStatusListItem = tasksPage.taskStatusList
        for (let n=0; n < taskStatusListItem.length; n++) {
            let x = taskStatusListItem[n]
            if (await this.matchCurrentStatusCssClass(i,x) == true) {
                    return x.status
            }
            //console.log(x.status+' for '+(i+1)+' doesnt match')
        }
    }

    async taskStatusMatch(i, currentStatus, desiredStatus) {
        if (await this.currentStatus(i) == currentStatus) {
            console.log(await this.currentStatus(i)+' will be updated to '+desiredStatus)
            return true
        }
        return false
    }

    async taskNameMatch(i, searchName) {
        let currentName = await tasksPage.taskName.nth(i).innerText
        if (currentName.toString().includes(searchName)) {
            console.log(currentName+' #'+(i+1)+' includes '+ searchName)
            return true
        }
        //console.log(currentName+' #'+(i+1)+' doesnt include '+ searchName)
        return false
    }

    async taskMatch(i, searchName, currentStatus, desiredStatus) {
        if (await this.taskNameMatch(i, searchName) == true && await this.taskStatusMatch(i, currentStatus, desiredStatus) == true){
            //console.log('Found a task with matching currentStatus = '+currentStatus+' and '+searchName)
            return true
        }
        return false
    }
    
    async setTaskStatus(searchName, currentStatus, desiredStatus) {
        const rows = await tasksPage.table.find('cdk-row').count
        console.log('Searching for task with status = '+currentStatus)
        for (var i = 0; i < rows; i++) {
            let taskMatch = await this.taskMatch(i, searchName, currentStatus, desiredStatus)
            if (taskMatch == true) {
                console.log('Status of Task number ' + (i+1) + ' is updated from '+ currentStatus+' to ' + desiredStatus) 
                await t.click(tasksPage.taskStatus.nth(i))
                await t.click(tasksPage.selectTaskStatus[desiredStatus])
                break
            }
            console.log('Test failed')
        }
    }

    async deleteTaskAtPosition(num){
        await t
            .click(tasksPage.taskContextMenu.nth(num))
            .click(tasksPage.taskContextMenuOptionDelete)
            .click(tasksPage.taskConfirmDeletion)
        console.log('Task at position #'+ num+' deleted')
    }
}

export default Tasks