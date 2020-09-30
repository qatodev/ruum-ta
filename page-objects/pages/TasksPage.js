import { Selector, t } from 'testcafe'
import BasePage from '../pages/BasePage'

// Home Page elements from https://open.ruumapp.com/home/
// Navbar is in a separate class - navbarAuth.js

class TasksPage extends BasePage {
    constructor() {
        super()
        // New Task form
        this.newTask = Selector('ruum-task-list-new-item')
        this.newTaskName = Selector('textarea').withAttribute('placeholder', 'Type the task name...') // TestTaskXXX
        this.newTaskRuum = Selector('input').withAttribute('placeholder', 'Select or search for a Ruum') //[Sample Ruum] Weekly Meeting
        this.newTaskSection = Selector('input').withAttribute('placeholder', 'Select or search for a Section') // Open Tasks 
        this.createTaskButton = Selector('button').withAttribute('title', 'Select a Ruum and a Section')
        
        // another strategy for the form would be to select items from the dropdown
        this.newTaskRuumDropdownItem = Selector('.dropdown-menu').child() //.withText('[Sample Ruum] Weekly Meeting')
        this.newTaskSectionDropdownItem = Selector('.dropdown-menu').child() // Open Tasks 

        // Filter Tasks
        this.searchTasks = Selector('ruum-search')
        this.resultsCountText = Selector('button').withText('Results', { timeout: 50000 })

        // Tasks list
        this.table = Selector('cdk-table')
        this.taskRow = Selector('cdk-row')
        this.taskCell = Selector('cdk-cell')
        this.taskName = Selector('ruum-task-list-cell-description > div > span')
        this.taskStatus = Selector('ruum-task-status')
        this.taskStatusDropdown = Selector('ruum-dropdown-list')
        this.taskStatusItem = Selector('ruum-dropdown-item')
        this.selectTaskStatus = {
            'Open': Selector('ruum-dropdown-item').withText('Open'),
            'Working on it': Selector('ruum-dropdown-item').withText('Working on it'),
            'At Risk': Selector('ruum-dropdown-item').withText('At Risk'),
            'Blocked': Selector('ruum-dropdown-item').withText('Blocked'),
            'Done': Selector('ruum-dropdown-item').withText('Done')
        }

        // this.taskOpen = this.taskStatusItem.withText('Open')
        // this.taskWorking = this.taskStatusItem.withText('Working on it') 
        // this.taskRisk = this.taskStatusItem.withText('At Risk') 
        // this.taskBlocked = this.taskStatusItem.withText('Blocked') 
        // this.taskDone = this.taskStatusItem.withText('Done')
        
        // status icons
        this.taskStatusIs = {
            'Open': Selector('.icon-task-open').parent('.btn-link-secondary'),
            'Working on it': Selector('.icon-task-progress').parent('.btn-link-info'),
            'At Risk': Selector('.icon-task-blocked-filled').parent('.btn-link-warning'),
            'Blocked': Selector('.icon-task-blocked-filled').parent('.btn-link-danger'),
            'Done': Selector('.icon-task-completed-filled').parent('.btn-link-success')
        }

        this.taskStatusList = [
            {'iconClass': 'open', 'iconParentClass' : 'secondary', 'status' : 'Open'},
            {'iconClass': 'progress', 'iconParentClass' : 'info', 'status' : 'Working on it'},
            {'iconClass': 'blocked', 'iconParentClass' : 'warning', 'status' : 'At Risk'},
            {'iconClass': 'blocked', 'iconParentClass' : 'danger', 'status' : 'Blocked'},
            {'iconClass': 'completed', 'iconParentClass' : 'success', 'status' : 'Done'}
        ]

        // Delete task
        this.taskContextMenu = Selector('button').withAttribute('aria-label','Show task related options')
        this.taskContextMenuOptionDelete = Selector('ruum-menu-option button')
        this.taskConfirmDeletion = Selector('button').withText('Delete')
        this.taskCancelDeletion = Selector('button').withText('Cancel')

    }

    async dropDownItemFor(desiredStatus) {
        // 'Open', 'Working on it', 'At Risk', 'Blocked', 'Done'
        switch (desiredStatus) {
        case 'Open':
            return this.taskOpen
        case 'Working on it':
            return this.taskWorking
        case 'At Risk':
            return this.taskRisk
        case 'Blocked':
            return this.taskBlocked
        case 'Done':
            return this.taskDone
        default:
            console.log('Default case')
            break
        }
    }

}



class CurrentStatus {

}

export default TasksPage