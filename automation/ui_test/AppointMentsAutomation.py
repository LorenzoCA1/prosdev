from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time
from datetime import datetime

class AppointmentView(unittest.TestCase):


    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000")
        inst.driver.find_element_by_name("username").send_keys('regpagetest')
        inst.driver.find_element_by_name("password").send_keys('regpagetest')
        inst.driver.find_element_by_id('btn-signin').click()

    def test_1_view_appointment_week(self):
        print("View Appointments by Week Test")
        self.dateElement = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[1]/div[2]/h2")
        self.date = self.dateElement.text
        self.rightArrow = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[1]/div[1]/div[1]/button[2]")
        self.leftArrow  = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[1]/div[1]/div[1]/button[1]")

        #Edit in the Future so that its not brute forced test
        self.rightArrow.click()
        self.rightArrow.click()
        self.appointment = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[2]/div/table/tbody/tr[3]/td/div/div/div/div[2]/table/tbody/tr/td[4]/div/div[2]/div/a/div[1]")
        self.appointment.click()
        time.sleep(3)
        self.lastname = self.driver.find_element_by_xpath("//*[@id=\"lastname\"]")
        self.txt = self.lastname.get_attribute('value')
        print(self.txt)
        assert self.txt == 'Unit'
        self.driver.refresh()
        time.sleep(1)

    def test_2_view_appointment_day(self):
        print("View Appointments by Day Test")
        self.dayBtn = self.driver.find_element_by_xpath('//*[@id="timetable"]/div[1]/div[1]/div[2]/button[1]')
        self.rightArrow = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[1]/div[1]/div[1]/button[2]")
        self.leftArrow  = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[1]/div[1]/div[1]/button[1]")
        self.dayBtn.click()
        time.sleep(1)
        self.date = self.driver.find_element_by_xpath('//*[@id="timetable"]/div[1]/div[2]/h2')
        self.date_string = datetime.strptime('August 11, 2020', '%B %d, %Y')
        print(self.date_string)
        while True:
            self.tmp_date =  self.date.text
            self.tmp_date = datetime.strptime(self.tmp_date, '%B %d, %Y')
            if self.tmp_date == self.date_string:
                break
            elif self.tmp_date < self.date_string:
                self.rightArrow.click()
                time.sleep(1)
            else:
                self.leftArrow.click()
                time.sleep(1)
        self.appointment = self.driver.find_element_by_xpath('//*[@id="timetable"]/div[2]/div/table/tbody/tr[3]/td/div/div/div/div[2]/table/tbody/tr/td[2]/div/div[2]/div/a/div[1]')
        self.appointment.click()
        self.lastname = self.driver.find_element_by_xpath("//*[@id=\"lastname\"]")
        self.txt = self.lastname.get_attribute('value')
        print(self.txt)
        assert self.txt == 'Unit'
        self.driver.refresh()
        time.sleep(1)


    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()