SELENIUM LOGIN PAGE MODEL LAB — SIMPLE VERSION
==============================================

WHAT IS INCLUDED
----------------
login.html      A tiny demo login page with username, password, Login and Reset.
test_login.py   Selenium test script with five tests.
requirements.txt Python package requirement.
This file       Setup, run, change and troubleshooting steps.

IMPORTANT ABOUT THE "CHROME EXTENSION"
--------------------------------------
You do NOT need a Chrome extension to run this Selenium Python code.
Modern Selenium 4 uses Selenium Manager to locate/download/manage the compatible
ChromeDriver automatically in most setups. You need Google Chrome and Python.
Chrome extensions such as Selenium IDE are a different, record-and-playback tool.
This ZIP uses Python Selenium because it is easy to edit and adapt in a model lab.

PART 1 — INSTALL PYTHON
-----------------------
1. Install Python 3 from https://www.python.org/downloads/
2. During Windows installation, tick "Add Python to PATH".
3. Open Command Prompt and check:
     python --version
   If that does not work, try:
     py --version

PART 2 — OPEN THE PROJECT FOLDER IN CMD
---------------------------------------
1. Extract the ZIP.
2. Open the extracted `selenium_login_model_lab` folder.
3. Click the File Explorer address bar, type `cmd`, and press Enter.
   Command Prompt should open in that folder.

PART 3 — INSTALL SELENIUM
-------------------------
Run:
    python -m pip install -r requirements.txt

If `python` does not work, try:
    py -m pip install -r requirements.txt

PART 4 — RUN THE TESTS
----------------------
Run:
    python test_login.py

Or:
    py test_login.py

Chrome should open automatically, run the tests, and close. The terminal should
show:
    Test 1: Login page opened
    Test 2 passed: Empty input validation
    Test 3 passed: Invalid credentials
    Test 4 passed: Valid demo credentials
    Test 5 passed: Reset button
    All Selenium tests passed.

Internet may be required the first time Selenium Manager obtains a compatible
driver. If the computer has no internet and no compatible driver installed,
automatic driver setup may fail.

PART 5 — WHAT EACH SELENIUM COMMAND DOES
----------------------------------------
from selenium import webdriver
    Imports Selenium's browser automation.

driver = webdriver.Chrome()
    Starts Chrome. Selenium Manager handles driver setup on current Selenium 4.

driver.get(page_path)
    Opens the local login.html file.

driver.find_element(By.ID, "username")
    Finds an element using its HTML id.

send_keys("admin")
    Types text into an input.

click()
    Clicks a button.

clear()
    Clears an input before typing a new value.

assert actual == expected
    Checks whether the result is what the test expects. If false, the test fails.

driver.quit()
    Closes the browser and ends the Selenium session.

PART 6 — CHANGE THE PAGE OR TEST FOR ANOTHER QUESTION
-----------------------------------------------------
Always check the HTML first. Selenium locators must match the HTML.

A. If the question changes the username field id:
   HTML:
       <input id="user">
   Python must change to:
       driver.find_element(By.ID, "user")

B. If the question changes the password field id:
   HTML:
       <input id="pwd">
   Python must change to:
       driver.find_element(By.ID, "pwd")

C. If the Login button id changes:
   HTML:
       <button id="submitBtn">Login</button>
   Python must use:
       driver.find_element(By.ID, "submitBtn").click()

D. If the result/message id changes:
   HTML:
       <p id="result"></p>
   Python must use:
       driver.find_element(By.ID, "result")

E. If the page is already hosted on a website:
   Replace the line:
       page_path = Path(__file__).with_name("login.html").resolve().as_uri()
   and:
       driver.get(page_path)
   with:
       driver.get("http://localhost:5500/login.html")
   Use the actual URL and port for the page you are testing.

F. If the test expects a different successful login:
   Edit the demo condition in login.html:
       username === "admin" && password === "admin123"
   and change the successful credentials in test_login.py to match.
   These credentials are only for this demonstration page, not a real secure
   authentication system. Real applications should validate on the server.

G. If asked to test registration:
   Add name/email/password fields to the HTML, then find them with By.ID,
   use send_keys(), click the Register button, and assert the success message.
   The locator id must exactly match the HTML.

H. If asked to test search:
   Find the search input by ID, send_keys("some text"), then assert the result
   shown on the page.

PART 7 — SELENIUM IDE CHROME EXTENSION (OPTIONAL)
-------------------------------------------------
If your instructor specifically wants a Chrome extension:
1. Open Chrome Web Store.
2. Search for "Selenium IDE".
3. Install the extension from the official listing.
4. Click the extension icon and choose to start a new project/recording.
5. Enter the local page URL or open login.html in Chrome first.
6. Record actions: enter username, enter password, click Login.
7. Stop recording and save the project/test.
8. Replay the recorded test from Selenium IDE.

Note: the exact Selenium IDE screens may change by version. Selenium IDE recording
is optional and is separate from running `test_login.py`. The Python test script
does not use the extension.

PART 8 — COMMON ERRORS
----------------------
1. `ModuleNotFoundError: No module named 'selenium'`
   Run:
       python -m pip install -r requirements.txt

2. `python is not recognized`
   Reinstall Python and tick "Add Python to PATH", or use `py`.

3. Chrome does not start / driver error
   - Update Chrome.
   - Run `python -m pip install --upgrade selenium`.
   - Check internet access for Selenium Manager's first-time driver setup.
   - Close any stuck Chrome process and rerun.
   - If your college lab blocks downloads, ask the lab administrator for a
     compatible ChromeDriver or use a permitted preinstalled setup.

4. Assertion error
   The actual page message differs from the expected message. Check the text in
   login.html and the expected text in test_login.py.

5. Element not found
   The `By.ID` value does not match the HTML id. IDs are case-sensitive.

6. Chrome opens then immediately closes
   The script runs `driver.quit()` at the end. Read the Command Prompt output.
   The included script waits two seconds before closing so the final state can
   briefly be seen.

MODEL LAB CHECKLIST
-------------------
[ ] Python installed
[ ] Chrome installed
[ ] Selenium installed
[ ] login.html ids match the Python locators
[ ] Run `python test_login.py`
[ ] Explain what `get`, `find_element`, `send_keys`, `click`, `assert`, and
    `quit` do

Security note: this is a local practice page with hard-coded demo credentials.
Do not use this login logic for real accounts or sensitive data.
