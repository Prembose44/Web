from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pathlib import Path
import time

# Opens the local login.html file in Chrome.
page_path = Path(__file__).with_name("login.html").resolve().as_uri()

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 5)

try:
    driver.get(page_path)
    print("Test 1: Login page opened")

    # Test 2: Empty form validation
    driver.find_element(By.ID, "loginButton").click()
    message = wait.until(
        EC.visibility_of_element_located((By.ID, "message"))
    )
    assert message.text == "Please enter username and password"
    print("Test 2 passed: Empty input validation")

    # Test 3: Invalid credentials
    driver.find_element(By.ID, "username").send_keys("wronguser")
    driver.find_element(By.ID, "password").send_keys("wrongpass")
    driver.find_element(By.ID, "loginButton").click()
    assert driver.find_element(By.ID, "message").text == "Invalid username or password"
    print("Test 3 passed: Invalid credentials")

    # Test 4: Valid credentials for this DEMO page
    username = driver.find_element(By.ID, "username")
    password = driver.find_element(By.ID, "password")
    username.clear()
    password.clear()
    username.send_keys("admin")
    password.send_keys("admin123")
    driver.find_element(By.ID, "loginButton").click()
    assert driver.find_element(By.ID, "message").text == "Login successful"
    print("Test 4 passed: Valid demo credentials")

    # Test 5: Reset button clears both fields
    driver.find_element(By.ID, "resetButton").click()
    assert driver.find_element(By.ID, "username").get_attribute("value") == ""
    assert driver.find_element(By.ID, "password").get_attribute("value") == ""
    print("Test 5 passed: Reset button")

    print("All Selenium tests passed.")

finally:
    time.sleep(2)
    driver.quit()
