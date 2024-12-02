var app = angular.module('myApp');

app.controller("AdminController", function($scope, ArticleService, EventService) {
    $scope.currentTab = 'articles';
    $scope.articles = [];
    $scope.events = [];
    $scope.showForm = false;
    $scope.editing = false;
    $scope.formData = {};
    $scope.successMessage = '';

    // Load articles
    $scope.loadArticles = function() {
        $scope.currentTab = 'articles';
        ArticleService.getAll().then(response => {
            console.log(response.data);  // Log untuk memastikan data diterima
            $scope.articles = response.data; // Pastikan data diterima dan disimpan di scope
        }).catch(error => {
            console.error('Error loading articles:', error); 
        });
    };

    // Load events
    $scope.loadEvents = function() {
        $scope.currentTab = 'events';
        EventService.getAll().then(response => {
            console.log(response.data); // Log untuk memastikan data diterima
            $scope.events = response.data.events; // Pastikan data diterima dan disimpan di scope
        }).catch(error => {
            console.error('Error loading events:', error); 
        });
    };    
    

    // Open form
    $scope.openArticleForm = function() {
        $scope.formData = {};
        $scope.showForm = true;
        $scope.editing = false;
    };

    $scope.openEventForm = function() {
        $scope.formData = {}; 
        $scope.showForm = true; 
        $scope.editing = false; 
    };
    
    // Save form
    $scope.saveForm = function() {
        if ($scope.currentTab === 'articles') {
            if (!$scope.formData.author) {
                alert('Author is required!');
                return;
            }
            if ($scope.editing) {
                ArticleService.update($scope.formData.id, $scope.formData).then(() => {
                    $scope.loadArticles();
                    alert('Article updated successfully');
                });
            } else {
                ArticleService.create($scope.formData)
                    .then(() => {
                        $scope.loadArticles(); 
                        alert('Article added successfully');
                    })
                    .catch(error => {
                        console.error('Error adding Article:', error);
                        alert('Failed to add Article. Please try again.');
                    });
            }
        } else if ($scope.currentTab === 'events') {
            if ($scope.editing) {
                EventService.update($scope.formData.id, $scope.formData)
                    .then(() => {
                        $scope.loadEvents(); // Refresh data setelah update
                        alert('Event updated successfully');
                    })
                    .catch(error => {
                        console.error('Error updating event:', error);
                        alert('Failed to update event. Please try again.');
                    });
            } else {
                EventService.create($scope.formData)
                    .then(() => {
                        $scope.loadEvents(); // Refresh data setelah update
                        alert('Event added successfully');
                    })
                    .catch(error => {
                        console.error('Error adding event:', error);
                        alert('Failed to add event. Please try again.');
                    });
            }
        }
        
        $scope.showForm = false;
    };
    
    $scope.editArticle = function(article) {
        $scope.formData = angular.copy(article);
        $scope.showForm = true;
        $scope.editing = true;
    };
    
    $scope.editEvent = function(event) {
        $scope.formData = angular.copy(event);
        $scope.showForm = true;
        $scope.editing = true;
    };
        
    // Close form
    $scope.closeForm = function() {
        $scope.showForm = false;
    };

    // Delete 
    $scope.deleteArticle = function(id) {
        console.log('Article ID to delete:', id); // Debugging line
        if (confirm('Are you sure you want to delete this article?')) {
            ArticleService.delete(id)
                .then(() => {
                    $scope.loadArticles();
                    alert('Article deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting article:', error);
                    alert('Failed to delete article. Please try again.');
                });
        }
    };    
    
    
    $scope.deleteEvent = function(id) {
        console.log('Event ID to delete:', id); // Debugging line
        if (confirm('Are you sure you want to delete this event?')) {
            EventService.delete(id)
                .then(() => {
                    $scope.loadEvents();
                    alert('Event deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting event:', error);
                    alert('Failed to delete event. Please try again.');
                });
        }
    };
    
    

    // **Logout Functionality**
    $scope.logout = function() {
        // Hapus token dari localStorage
        localStorage.removeItem('token');
        // Arahkan ke halaman login
        window.location.href = '../../index.html';
    };

    console.log($scope.formData);  
    console.log($scope.articles);
    console.log($scope.events);
    
    $scope.loadArticles();
    $scope.loadEvents();

});
