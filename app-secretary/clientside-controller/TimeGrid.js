class TimeGridView extends FullCalendar.Calendar{
    
    constructor(HTMLELEMENT, options)
    {
        super(HTMLELEMENT, options)
    }

    update(){
        this.render();
    }

    setShowEditForm(appform){
        this.setOption('eventClick', appform.showEditForm.bind(appform)) //Appintment.js
    }

    setShowAddForm(appform){

        let customButtons = {
            appointment: { text: '+ Appointment', click: appform.showAddForm.bind(appform)}
        }
        this.setOption('customButtons', customButtons)

    }


}
