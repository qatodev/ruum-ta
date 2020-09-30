import { Selector, t } from 'testcafe'
import LoginPage from '../../page-objects/pages/LoginPage'
import TasksPage from '../../page-objects/pages/TasksPage'
import Tasks from '../../page-objects/components/Tasks/tasks'
import Base from '../../page-objects/components/base'

const loginPage = new LoginPage()
const tasksPage = new TasksPage()
const tasks = new Tasks()
const base = new Base()

fixture `An existing user can work with tasks in Ruum`
    .page `https://open.ruumapp.com/`
    .beforeEach(async t => {
        await t.expect(loginPage.userEmail.exists).ok()
        base.logIn()
        await t.resizeWindow(1024, 768)
        await t.expect(tasksPage.taskList.exists).ok()
        await t.click(tasksPage.taskList)
    })

test('User can successfully add a taks', async t => {
    // Data for created tasks - task name is always different
    const newTaskName = `TestTask ${await tasks.timeStamp()}`
    const newTaskRuum = '[Sample Ruum] Weekly Meeting'
    const newTaskSection = 'Open Tasks'
    
    await tasks.createNewDummyTask(newTaskName, newTaskRuum, newTaskSection)
    await t.expect(tasksPage.taskName.innerText).contains(newTaskName)
})

test('User can set a task status to done', async t => {

    await t.click(tasksPage.taskStatus)
    await t.click(tasksPage.selectTaskStatus.Done)
    await t.expect(tasksPage.taskStatusIs.Done.exists).ok()
})

test('User can find a task', async t => {
    await t.typeText(tasksPage.searchTasks, 'TestTask')
})

