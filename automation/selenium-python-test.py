from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time

class SimpleNavigation(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\unit-tests\\automation\\chromedriver.exe")
        self.driver.implicitly_wait(30)
        self.driver.maximize_window()

    def test_navigate(self):
        print("Navigation Test")
        self.driver.get("localhost:3000/secretary")
        self.title = self.driver.title
        assert "Secretary" in self.title
        time.sleep(10)
    
    def teardown(self):
        self.driver.quit()
        
if __name__ == '__main__':
    unittest.main()