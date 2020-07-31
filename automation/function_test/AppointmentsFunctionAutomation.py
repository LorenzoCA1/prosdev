from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time


class AppointmentFunction(unittest.TestCase):
    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000")
        inst.driver.find_element_by_name("username").send_keys('regpagetest')
        inst.driver.find_element_by_name("password").send_keys('regpagetest')
        inst.driver.find_element_by_id('btn-signin').click()

    def test_1_add__edit_appointment(self):
        print("Add Appointments Test")
        self.appointment_button = self.driver.find_element_by_xpath('//*[@id="timetable"]/div[1]/div[3]/button')
        self.appointment_button.click()
        time.sleep(2)
        self.lastname = self.driver.find_element_by_name('lastname')
        self.lastname.send_keys('Unit')
        self.firstname = self.driver.find_element_by_name('firstname')
        self.firstname.send_keys('Test')
        self.doctor = self.driver.find_element_by_xpath('//*[@id="selDoc"]/div/i')
        self.doctor.click()
        self.driver.find_element_by_css_selector('#selDoc > div > div.menu.transition.visible > div:nth-last-child(1)').click()
        self.doctor.click()
        self.procedure = self.driver.find_element_by_xpath('//*[@id="app-form"]/div[2]/div[2]/div[2]/div/i')
        self.procedure.click()
        self.driver.find_element_by_css_selector('#app-form > div.ui.very.padded.grid > div.ten.wide.column.ui.form > div.required.field.fieldProcedures > div > div.menu.transition.visible > div:nth-last-child(1)').click()
        self.procedure.click()
        self.date = self.driver.find_element_by_name('date')
        self.date.send_keys('07302020')
        self.tym  = self.driver.find_element_by_xpath('//*[@id="time"]')
        self.tym.send_keys('925a')
        time.sleep(1)
        self.driver.find_element_by_xpath('//*[@id="add-app"]').click()
        time.sleep(1)
        self.driver.find_element_by_xpath('//*[@id="timetable"]/div[2]/div/table/tbody/tr[3]/td/div/div/div/div[2]/table/tbody/tr/td[6]/div/div[2]/div/a/div[1]').click()
        assert self.lastname.get_attribute('value') == 'Unit'
        time.sleep(3)
        self.driver.find_element_by_xpath('//*[@id="app-form"]/i').click()
        time.sleep(3)

    def test_2_edit_process(self):
        print("Edit Process Test")
        self.card = self.driver.find_element_by_xpath('//*[@id="timetable"]/div[2]/div/table/tbody/tr[3]/td/div/div/div/div[2]/table/tbody/tr/td[6]/div/div[2]/div/a/div[1]')
        self.card.click()
        self.firstname = self.driver.find_element_by_name('firstname')
        self.firstname.clear()
        self.firstname.send_keys('Test1')
        time.sleep(0.5)
        self.driver.find_element_by_xpath('//*[@id="save-app"]').click()
        self.card.click()
        self.firstname = self.driver.find_element_by_name('firstname')
        print(self.firstname.get_attribute('value'))
        assert self.firstname.get_attribute('value') ==  'Test'
        self.driver.find_element_by_xpath('//*[@id="del-app"]').click()
        time.sleep(1.5)

    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()