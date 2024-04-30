/**
 * Removes message box
 * @param {Node} messageBox DOM Node object of Message
 */
function OkButton(messageBox) {
    document.body.removeChild(messageBox);
};

/**
 * Reloads the window to play again
*/
function Play() {
    window.location.reload();
};

/**
 * To show message with rules
*/
function Rules() {
    let rules = ['Unlimited time',
        'You must attack when possible',
        'All checkers are played on black tiles',
        'Base pieces can only go forward',
        'After reaching the end of the board base pieces become kinged',
        'Kings can go any direction',
        'Player wins when there\'s no enemy checkers left or if the enemy can\'t move'];
    let message = document.createElement('ul');

    rules.map((rule) => {
        let ruleElement = document.createElement('li');
        ruleElement.innerHTML = rule;
        message.appendChild(ruleElement);
    });

    new Message(message, 'Rules').ShowWithHeader();
};