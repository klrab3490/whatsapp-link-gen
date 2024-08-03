document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the "Generate Links" button
    document.getElementById('generate').addEventListener('click', function() {
        const contacts = document.getElementById('contacts').value.split(',');
        const messageText = document.getElementById('message').value;
    
        const encodedMessage = encodeURIComponent(messageText);
        const linksDiv = document.getElementById('links');
        linksDiv.innerHTML = '';
    
        const links = [];
    
        contacts.forEach(contact => {
            const trimmedContact = contact.trim();
            const link = `https://wa.me/91${trimmedContact}?text=${encodedMessage}`;
            links.push(link);
    
            const linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.target = '_blank'; // Opens the link in a new tab
            linkElement.textContent = link;
    
            linksDiv.appendChild(linkElement);
            linksDiv.appendChild(document.createElement('br'));
        });
    
        // Store links in local storage for later use
        chrome.storage.local.set({ links: links }, function() {
            // Show the "Open All Links" button after storing links
            document.getElementById('openAll').style.display = 'block';
        });
    });
  
    // Add event listener for the "Open All Links" button
    document.getElementById('openAll').addEventListener('click', function() {
        // Retrieve links from local storage and open them
        chrome.storage.local.get(['links'], function(result) {
            const links = result.links || [];
            links.forEach(link => {
                chrome.tabs.create({ url: link });
            });
        });
    });
});
  