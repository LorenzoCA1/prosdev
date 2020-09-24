from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time


class PatientLoginFunction(unittest.TestCase):
    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000/patientLogin")

    def test_1_valid_credentials(self):
        print('Patient Signs in with valid credentials')
        self.driver.find_element_by_name('username').send_keys('feebeef')
        self.driver.find_element_by_name('password').send_keys('5527834')
        self.driver.find_element_by_id('btn-signin').click()
        time.sleep(1)
        assert self.driver.current_url == 'http://localhost:3000/appointments'
        time.sleep(2)

    def test_2_logout_patient(self):
        print('Patient Signs Out from Page')
        self.driver.find_element_by_xpath('/html/body/nav/div/a').click()
        time.sleep(1)
        assert self.driver.current_url == 'http://localhost:3000/patientLogin'

    def test_3_invalid_credentials(self):
        print('User Signs in As Patiend with Invalid Credentials')
        self.driver.get("localhost:3000/patientLogin")
        self.driver.find_element_by_name('username').send_keys('feebeef')
        self.driver.find_element_by_name('password').send_keys('asd')
        self.driver.find_element_by_id('btn-signin').click()
        time.sleep(1)
        assert self.driver.current_url == 'http://localhost:3000/login'

    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()