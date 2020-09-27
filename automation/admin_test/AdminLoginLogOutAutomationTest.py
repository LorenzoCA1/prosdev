from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time
import re


class AdminLoginFunction(unittest.TestCase):
    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000/admin")

    def test_1_valid_credentials(self):
        print('Admin Signs in with valid credentials')
        self.driver.find_element_by_name('username').send_keys('admin')
        self.driver.find_element_by_name('password').send_keys('regpagetest')
        self.driver.find_element_by_id('btn-signin').click()
        time.sleep(1)
        self.src = self.driver.page_source
        self.text = re.search(r'Logout', self.src)
        time.sleep(3)
        time.sleep(2)

    def test_2_logout_patient(self):
        print('Admin Signs Out from Page')
        self.driver.find_element_by_xpath('/html/body/nav/div/a').click()
        time.sleep(1)
        assert self.driver.current_url == 'http://localhost:3000/adminLogin'

    def test_3_invalid_credentials(self):
        print('User Signs in As Admin with Invalid Credentials')
        self.driver.get("localhost:3000/patientLogin")
        self.driver.find_element_by_name('username').send_keys('feebeef')
        self.driver.find_element_by_name('password').send_keys('asd')
        self.driver.find_element_by_id('btn-signin').click()
        self.src = self.driver.page_source
        self.text =  re.search(r'Invalid', self.src)
        time.sleep(1)
        self.assertNotEqual(self.text, None)

    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()