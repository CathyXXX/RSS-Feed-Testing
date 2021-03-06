/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
         it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* "The menu" */
    describe('The menu', function(){

        /* A test that ensures the menu element is
         * hidden by default.
         */

         it('is not visible', function() {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. Test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('toggle menu on and off', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
 });
    /* "Initial Entries" */
    describe('Initial Entries', function(){

        /* Test that ensures when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container.
         * Remember, loadFeed() is asynchronous, this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('completes its work', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldFeed;
        var newFeed;

        /* Testing that a new feed is loaded by the loadFeed function
         * and that the content actually changes. LoadFeed() is asynchronous.
         */
         beforeEach(function(done) {
            loadFeed(0, function(){
                oldFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('Changed Content', function() {
            expect($('.feed').html()).not.toBe(oldFeed);
            });
        });
}());
