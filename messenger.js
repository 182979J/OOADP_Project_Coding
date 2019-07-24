//JS created for flash-messaging
// after require flash-messaging at app.js,
const flashMessage = (res, messageType, message, icon, dismissable) => { //arguments passed from main.js
    let alert; //defining t?
    switch (messageType) { //if messageType == success/error/info/danger
        case 'success':
            alert = res.flashMessenger.success(message);
            break;
        case 'error':
            alert = res.flashMessenger.error(message);
            break;
        case 'info':
            alert = res.flashMessenger.info(message);
            break;
        case 'danger':
            alert = res.flashMessenger.danger(message);
            break;
        default:
            alert = res.flashMessenger.info(message);
    }
    alert.titleIcon = icon;
    alert.canBeDismissed = dismissable;
    
}; module.exports = flashMessage; //returns a function 
//can say that the returns from method flashMessage is automatically put in the "alertBeforeFlush" "list"