from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time
import re

class SecretaryAcceptRequests(unittest.TestCase):
    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000/secretaryLogin")
        inst.driver.find_element_by_name('username').send_keys('regpagetest')
        inst.driver.find_element_by_name('password').send_keys('regpagetest')
        inst.driver.find_element_by_id('btn-signin').click()

    def test_1_valid_credentials(self):
        print('Secretary Accept Request')
        self.driver.find_element_by_xpath('/html/body/nav/a[2]').click()
        self.driver.find_element_by_xpath('//*[@id="btnApprove"]').click()
        time.sleep(1)
        self.driver.find_element_by_xpath('/html/body/nav/a[1]').click()
        self.src = self.driver.page_source
        self.text =  re.search(r'2:20', self.src)
        self.assertEquals(self.text, None)

    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()