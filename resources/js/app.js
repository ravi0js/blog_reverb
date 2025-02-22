import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

// Utility functions
const getLoggedInUserId = () => Number(document.querySelector("meta[name='user-id']")?.getAttribute("content"));
const createNotification = (message, type = "bg-green-500") => {
    const notificationContainer = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.classList.add(
        type, "text-white", "p-2", "rounded-lg", "shadow-md", "fade-in", "flex", "items-center", "gap-2", "text-sm", "font-semibold"
    );
    notification.innerHTML = message;
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => notification.remove(), 500);
    }, 8000);
};

const updateBlogItem = (blogItem, event) => {
    // Highlight the updated blog item
    blogItem.classList.add("highlight-update");

    // Update title, content, and date
    blogItem.querySelector("h4").textContent = event.title;
    blogItem.querySelector("p.text-gray-700").textContent = `${event.content.substring(0, 100)}...`;
    blogItem.querySelector("p.text-sm.text-gray-600").textContent = `By ${event.user?.name ?? 'Unknown Author'} on ${new Date(event.updated_at).toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' })}.`;

    // Remove highlight after 1 second
    setTimeout(() => {
        blogItem.classList.remove("highlight-update");
    }, 1000);
};

const addNewBlog = (event) => {
    const blogList = document.getElementById("blog-list");
    if (!blogList) return;

    const newBlog = document.createElement("div");
    newBlog.classList.add("bg-white", "shadow-lg", "rounded-lg", "overflow-hidden", "blog-item", "slide-in");
    newBlog.id = `blog-${event.id}`;

    newBlog.innerHTML = `
        <div class="p-4">
            <h4 class="text-lg font-semibold text-gray-900">${event.title}</h4>
            <p class="text-sm text-gray-600">
                By <span class="font-semibold">${event.user?.name ?? 'Unknown Author'}</span>
                on ${new Date(event.created_at).toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' })}.
            </p>
            <p class="text-gray-700 mt-2">${event.content.substring(0, 100)}...</p>
            <a href="/blog" class="inline-block mt-3 text-blue-500 font-semibold hover:underline">Read More</a>
        </div>
    `;

    blogList.insertBefore(newBlog, blogList.firstChild);

    // Remove "slide-in" effect after 500ms
    setTimeout(() => newBlog.classList.remove("slide-in"), 500);
};

// Show deletion dialog that auto-closes
const showDeletionDialog = () => {
    const dialog = document.createElement("div");
    dialog.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "bg-gray-800", "bg-opacity-50", "flex", "items-center", "justify-center");
    dialog.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 class="text-lg font-semibold mb-4">Blog Deleted</h3>
            <p>The author has deleted this blog post.</p>
        </div>
    `;
    
    document.body.appendChild(dialog);

    // Auto-remove the dialog after 3 seconds
    setTimeout(() => {
        dialog.remove();
    }, 3000);
};

// Main logic
const handleBlogEvent = (event, eventType) => {
    const loggedInUserId = getLoggedInUserId();
    const eventUserId = event.user?.id ? Number(event.user.id) : null;

    if (eventUserId !== null && eventUserId === loggedInUserId) {
        console.log(`Skipping notification for the blog author on ${eventType}.`);
        return;
    }

    if (eventType === 'created') {
        addNewBlog(event);
    } else if (eventType === 'updated') {
        const blogItem = document.getElementById(`blog-${event.id}`);
        if (blogItem) {
            updateBlogItem(blogItem, event);
        }
    }

    if (event.title && event.user?.name) {
        createNotification(`📝 ${eventType === 'created' ? 'New Blog' : 'Blog Updated'}: ${event.title} by ${event.user.name}`);
    }
};

// Echo event listeners
window.Echo.channel('blogs').listen('.blog.created', (event) => {
    console.log('New Blog Created:', event);
    handleBlogEvent(event, 'created');
});

window.Echo.channel('blogs').listen('.blog.deleted', (event) => {
    console.log('Blog Deleted:', event);
    showDeletionDialog(); // Show the deletion dialog automatically
});

window.Echo.channel('blogs').listen('.blog.updated', (event) => {
    console.log('Blog Updated:', event);
    handleBlogEvent(event, 'updated');
});
