from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time

class SimpleNavigation(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        self.driver.implicitly_wait(30)
        self.driver.maximize_window()

    def test_navigate_to_site(self):
        print("Navigation Test")
        self.driver.get("localhost:3000")
        #self.title = self.driver.title
        self.driver.implicitly_wait(30) #seconds
        self.appointmentName = self.driver.find_element_by_xpath("/html/body/nav/a[1]")
        assert self.appointmentName.text == "Appointment"
    
    def teardown(self):
        self.driver.quit()
        
if __name__ == '__main__':
    unittest.main()