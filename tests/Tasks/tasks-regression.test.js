import { Selector, t } from 'testcafe'
import LoginPage from '../../page-objects/pages/LoginPage'
import Base from '../../page-objects/components/base'
import TasksPage from '../../page-objects/pages/TasksPage'
import Tasks from '../../page-objects/components/Tasks/tasks'

const loginPage = new LoginPage()
const base = new Base()
const tasksPage = new TasksPage()
const tasks = new Tasks()

fixture `An existing user can create, search update and delete tasks`
    .page `https://open.ruumapp.com/`
    .beforeEach(async t => {
        await base.logIn()
        await t.click(tasksPage.taskList)
    })

test('User can update the task status to Done', async t => {
    
    // Create tasks with recognisable unique name    
    // Data for created tasks. Task name is always different
    //------------------------------------------------------
    const newTaskName = `TestTask ${await tasks.timeStamp()}`
    const newTaskRuum = '[Sample Ruum] Weekly Meeting'
    const newTaskSection = 'Open Tasks'
    
    await tasks.createNewDummyTask(newTaskName, newTaskRuum, newTaskSection)
    await t.expect(tasksPage.taskName.innerText).contains(newTaskName)
    //------------------------------------------------------

    // Find the task (created previously) according to criteria 

    await t.typeText(tasksPage.searchTasks, 'TestTask')
    const resultsCountText = await tasksPage.resultsCountText.innerText
    const resultsCount = parseInt(resultsCountText,10)
    console.log('Found '+resultsCount+' mathing tasks')
    await t.expect(resultsCount).eql(await tasksPage.taskRow.count)

    // From search results find a task with status open
    // Usually it is the first in the list
    // Update status for the task
    // 'Open', 'Working on it', 'At Risk', 'Blocked', 'Done'
    const currentStatus = 'Open'
    const desiredStatus = 'Done' //.innerText
    const searchName = 'TestTask'

    await tasks.setTaskStatus(searchName, currentStatus, desiredStatus)
    const activeTaskPosition = 0 // Starts from zero
    const currentTaskStatus = await tasks.currentStatus(activeTaskPosition)
    console.log('Current Task\'s status is '+currentTaskStatus)
    await t.expect(currentTaskStatus).contains(desiredStatus)

    // Delete the last created task
    await tasks.deleteTaskAtPosition(activeTaskPosition)
    await t.expect(resultsCount).eql(await tasksPage.taskRow.count + 1)
    //await t.wait(1000)
})

